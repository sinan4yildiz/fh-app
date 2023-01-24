<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ReportingApi
{
    protected string $apiUrl;
    protected string $userEmail;
    protected string $userPassword;
    protected string $accessTokenFilename;
    protected int $accessTokenLifetime;

    public function __construct(array $config)
    {
        $this->apiUrl = $config['apiUrl'];
        $this->userEmail = $config['userEmail'];
        $this->userPassword = $config['userPassword'];
        $this->accessTokenFilename = $config['accessTokenFilename'];
        $this->accessTokenLifetime = $config['accessTokenLifetime'];
    }

    public function login()
    {
        return Http::log()
            ->post("$this->apiUrl/merchant/user/login", [
                'email' => $this->userEmail,
                'password' => $this->userPassword,
            ]);
    }

    public function transactionList(array $params = [])
    {
        return Http::log()
            ->withHeaders([
                'Authorization' => $this->getAccessToken(),
            ])
            ->post("$this->apiUrl/transaction/list", $params);
    }

    public function getAccessToken(): string | null
    {
        return $this->getAccessTokenFromLocal() ?? $this->getAccessTokenFromApi();
    }

    private function getAccessTokenFromApi(): string | null
    {
        try {
            $login = $this->login();

            if ($login->successful()) {
                Storage::disk('local')->put($this->accessTokenFilename, $login->json('token'));

                return $login->json('token');
            }
        } catch (\Exception $exception) {
            $this->logException($exception);
        }

        return null;
    }

    private function getAccessTokenFromLocal(): string | null
    {
        if (!Storage::disk('local')->exists($this->accessTokenFilename))
            return null;

        try {
            $tokenCreatedAt = Storage::disk('local')->lastModified($this->accessTokenFilename);

            if ($this->accessTokenLifetime >= time() - $tokenCreatedAt) {
                return Storage::disk('local')->get($this->accessTokenFilename);
            }
        } catch (\Exception $exception) {
            $this->logException($exception);
        }

        return null;
    }

    private function logException(\Exception $exception): void
    {
        Log::channel('reportingApi')->emergency(
            implode(PHP_EOL, [
                $exception->getFile(),
                $exception->getMessage(),
                $exception->getTraceAsString(),
            ])
        );
    }
}
