<?php

use App\Http\Controllers\ReportingApiController;
use App\Http\Middleware\ApiResponseHandler;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::controller(ReportingApiController::class)
    ->name('reportingApi.')
    ->middleware([
        ApiResponseHandler::class
    ])
    ->group(function () {
        Route::post('/report', 'getReport')->name('getReport');
        Route::post('/transaction', 'getTransaction')->name('getTransaction');
        Route::post('/transactions', 'getTransactions')->name('getTransactions');
        Route::post('/client', 'getClient')->name('getClient');
    });
