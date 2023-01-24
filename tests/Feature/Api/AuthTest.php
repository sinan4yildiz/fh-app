<?php

namespace Tests\Feature\Api;

use App\Services\ReportingApi;
use Tests\TestCase;

class AuthTest extends TestCase
{
    protected ReportingApi $reportingApi;

    public function __construct()
    {
        parent::__construct();
    }

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
}
