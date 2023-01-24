<?php

namespace Tests\Feature\Api;

use App\Services\ReportingApi;
use Tests\TestCase;

class TransactionTest extends TestCase
{
    protected ReportingApi $reportingApi;

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Throws error when transaction list cannot be retrieved
     *
     * @return void
     */
    public function testTransactionList(): void
    {
        $reportingApi = new ReportingApi(config: config('services.reportingApi'));

        $list = $reportingApi->transactionList();

        $this->assertTrue($list->successful());
    }
}
