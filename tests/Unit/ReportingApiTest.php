<?php

namespace Tests\Unit;

use App\Services\ReportingApi;
use Tests\TestCase;

class ReportingApiTest extends TestCase
{
    /**
     * Throws error when login through the API is failed
     *
     * @return void
     */
    public function testLogin(): void
    {
        $reportingApi = new ReportingApi(config: config('services.reportingApi'));

        $login = $reportingApi->login();

        $this->assertTrue($login->successful());
    }

    /**
     * Throws error when access token could not be fetched
     *
     * @return void
     */
    public function testGetAccessToken(): void
    {
        $reportingApi = new ReportingApi(config: config('services.reportingApi'));

        $this->assertTrue(is_string($reportingApi->getAccessToken()));
    }

    /**
     * Throws error when transaction list cannot be retrieved
     *
     * @return void
     */
    public function testGetTransactions(): void
    {
        $reportingApi = new ReportingApi(config: config('services.reportingApi'));

        $list = $reportingApi->getTransactions();

        $this->assertTrue($list->successful());
    }
}
