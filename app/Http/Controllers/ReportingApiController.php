<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReportingApi\ClientRequest;
use App\Http\Requests\ReportingApi\ReportRequest;
use App\Http\Requests\ReportingApi\TransactionListRequest;
use App\Http\Requests\ReportingApi\TransactionRequest;
use App\Services\ReportingApi;

class ReportingApiController extends Controller
{
    protected ReportingApi $reportingApi;

    public function __construct(ReportingApi $reportingApi)
    {
        $this->reportingApi = $reportingApi;
    }

    public function getReport(ReportRequest $request): string
    {
        return $this->reportingApi->getReport([
            'fromDate' => $request->post('fromDate'),
            'toDate' => $request->post('toDate'),
            'merchant' => $request->post('merchant'),
            'acquirer' => $request->post('acquirer'),
        ]);
    }

    public function getTransaction(TransactionRequest $request): string
    {
        return $this->reportingApi->getTransaction($request->post('transactionId'));
    }

    public function getTransactions(TransactionListRequest $request): string
    {
        return $this->reportingApi->getTransactions([
            'fromDate' => $request->post('fromDate'),
            'toDate' => $request->post('toDate'),
            'status' => $request->post('status'),
            'operation' => $request->post('operation'),
            'paymentMethod' => $request->post('paymentMethod'),
            'merchantId' => $request->post('merchantId'),
            'acquirerId' => $request->post('acquirerId'),
        ]);
    }

    public function getClient(ClientRequest $request): string
    {
        return $this->reportingApi->getClient($request->post('transactionId'));
    }
}
