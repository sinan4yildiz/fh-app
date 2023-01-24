<?php

namespace App\Enums\ReportingApi;

enum PaymentMethodEnum: string
{
    case CREDITCARD = 'CREDITCARD';
    case CUP = 'CUP';
    case IDEAL = 'IDEAL';
    case GIROPAY = 'GIROPAY';
    case MISTERCASH = 'MISTERCASH';
    case STORED = 'STORED';
    case PAYTOCARD = 'PAYTOCARD';
    case CEPBANK = 'CEPBANK';
    case CITADEL = 'CITADEL';
}
