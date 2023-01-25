<?php

namespace App\Interface;

use Illuminate\Http\Client\Response;

interface ReportingApiInterface
{
    public function login(): Response;

    public function getReport(array $params): string;

    public function getTransaction(string $transactionId): Response;

    public function getTransactionList(array $params = []): Response;

    public function getClient(string $transactionId): Response;

    public function getAccessToken(): string | null;

    function getAccessTokenFromApi(): string | null;

    function getAccessTokenFromLocal(): string | null;

    function getStub($name): string;

    function logException(\Exception $exception): void;
}
