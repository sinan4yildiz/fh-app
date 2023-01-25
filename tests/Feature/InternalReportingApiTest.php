<?php

namespace Tests\Feature;

use App\Services\ReportingApi;
use Tests\TestCase;

class InternalReportingApiTest extends TestCase
{
    protected ReportingApi $reportingApi;

    public function __construct()
    {
        parent::__construct();
    }

    public function testGetReport(): void
    {
        $this->post(route('reportingApi.getReport'), [
            'fromDate' => '2015-07-01',
            'toDate' => '2022-01-24'
        ])
            ->assertStatus(200)
            ->assertJsonStructure([
                [
                    'count',
                    'total',
                    'currency'
                ]
            ]);
    }

    public function testGetTransaction(): void
    {
        $this->post(route('reportingApi.getTransaction'), [
            'transactionId' => '1011027-1539357101-1293'
        ])
            ->assertStatus(200)
            ->assertJsonStructure([
                'transaction'
            ]);
    }

    public function testGetTransactions(): void
    {
        $response = $this->post(route('reportingApi.getTransactions'), [
            'fromDate' => '2016-10-01',
            'toDate' => '2022-03-24'
        ])->assertStatus(200);

        $this->assertTrue((bool) $response['data']);
    }

    public function testGetClient(): void
    {
        $this->post(route('reportingApi.getClient'), [
            'transactionId' => '1011027-1539357101-1293'
        ])
            ->assertStatus(200)
            ->assertJsonStructure([
                'customerInfo'
            ]);
    }
}
