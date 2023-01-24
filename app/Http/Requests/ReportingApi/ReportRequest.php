<?php

namespace App\Http\Requests\ReportingApi;

use Illuminate\Foundation\Http\FormRequest;

class ReportRequest extends FormRequest
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
            'fromDate' => 'required|date_format:Y-m-d',
            'toDate' => 'required|date_format:Y-m-d',
            'merchant' => 'nullable|int',
            'acquirer' => 'nullable|int',
        ];
    }
}
