<?php

namespace App\Http\Requests\ReportingApi;

use Illuminate\Foundation\Http\FormRequest;

class ClientRequest extends FormRequest
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
            'transactionId' => 'required|string',
        ];
    }
}
