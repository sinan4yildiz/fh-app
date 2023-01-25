<?php

namespace App\Services;

use App\Interface\ReportingApiInterface;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ReportingApi implements ReportingApiInterface
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

    public function getReport(array $params): string
    {
        /*
         * the /transactions/report endpoint returns error ("10.72.23.66:27017: The 'cursor' option is required, except for aggregate with the explain argument")
         * it's probably a MongoDB error, that's why this endpoint has been mocked with a stub file.
         * */
        return $this->getStub('TransactionReport');

        return $this->request->post("$this->apiUrl/transactions/report", $params);
    }

    public function getTransaction(string $transactionId): Response
    {
        return $this->request->post("$this->apiUrl/transaction", [
            'transactionId' => $transactionId
        ]);
    }

    public function getTransactions(array $params = []): Response
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

    public function getAccessTokenFromApi(): string | null
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

    public function getAccessTokenFromLocal(): string | null
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

    public function getStub($name): string
    {
        return File::get(app_path("Stubs/{$name}.json"));
    }

    public function logException(\Exception $exception): void
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
