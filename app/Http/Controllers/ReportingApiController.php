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
            'fromDate' => $request->json('fromDate'),
            'toDate' => $request->json('toDate'),
            'merchant' => $request->json('merchant'),
            'acquirer' => $request->json('acquirer'),
        ]);
    }

    public function getTransaction(TransactionRequest $request): string
    {
        return $this->reportingApi->getTransaction($request->json('transactionId'));
    }

    public function getTransactionList(TransactionListRequest $request): string
    {
        return $this->reportingApi->getTransactionList([
            'fromDate' => $request->json('fromDate'),
            'toDate' => $request->json('toDate'),
            'status' => $request->json('status'),
            'operation' => $request->json('operation'),
            'paymentMethod' => $request->json('paymentMethod'),
            'merchantId' => $request->json('merchantId'),
            'acquirerId' => $request->json('acquirerId'),
        ]);
    }

    public function getClient(ClientRequest $request): string
    {
        return $this->reportingApi->getClient($request->json('transactionId'));
    }
}
