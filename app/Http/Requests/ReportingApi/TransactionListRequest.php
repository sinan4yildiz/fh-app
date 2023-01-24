<?php

namespace App\Http\Requests\ReportingApi;

use App\Enums\ReportingApi\OperationEnum;
use App\Enums\ReportingApi\PaymentMethodEnum;
use App\Enums\ReportingApi\StatusEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class TransactionListRequest extends FormRequest
{
    /**
     * Apply rules
     *
     * @return array
     *
     */
    public function rules(): array
    {
        return [
            'fromDate' => 'nullable|date_format:Y-m-d',
            'toDate' => 'nullable|date_format:Y-m-d',
            'status' => ['nullable', new Enum(StatusEnum::class)],
            'operation' => ['nullable', new Enum(OperationEnum::class)],
            'paymentMethod' => ['nullable', new Enum(PaymentMethodEnum::class)],
            'merchantId' => 'nullable|int',
            'acquirerId' => 'nullable|int',
            /*
             * ...others
             * */
        ];
    }
}
