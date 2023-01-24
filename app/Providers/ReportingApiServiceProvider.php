<?php

namespace App\Providers;

use App\Services\ReportingApi;
use Illuminate\Support\ServiceProvider;

class ReportingApiServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot(): void
    {
        $this->app->singleton(ReportingApi::class, fn() => new ReportingApi(config: config('services.reportingApi')));
    }
}
