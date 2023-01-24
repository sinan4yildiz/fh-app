<?php

namespace App\Services;

use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\File;
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
    protected $request;

    public function __construct(array $config)
    {
        $this->apiUrl = $config['apiUrl'];
        $this->userEmail = $config['userEmail'];
        $this->userPassword = $config['userPassword'];
        $this->accessTokenFilename = $config['accessTokenFilename'];
        $this->accessTokenLifetime = $config['accessTokenLifetime'];

        $this->request = Http::log()
            ->withHeaders([
                'Authorization' => $this->getAccessToken(),
            ]);
    }

    public function login(): Response
    {
        return Http::post("$this->apiUrl/merchant/user/login", [
            'email' => $this->userEmail,
            'password' => $this->userPassword,
        ]);
    }

    public function getReport(array $params): Response
    {
        return $this->request->post("$this->apiUrl/transactions/report", $params);
    }

    public function getTransaction(string $transactionId): Response
    {
        return $this->request->post("$this->apiUrl/transaction", [
            'transactionId' => $transactionId
        ]);
    }

    public function getTransactionList(array $params = []): Response
    {
        return $this->request->post("$this->apiUrl/transaction/list", $params);
    }

    public function getClient(string $transactionId): Response
    {
        return $this->request->post("$this->apiUrl/client", [
            'transactionId' => $transactionId
        ]);
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

    private function getStub($name): string
    {
        return File::get(app_path("stubs/{$name}.json"));
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
