<?php

interface ReportingApiInterface
{
    public function getAccessToken(): string;

    public function getAccessTokenFromApi(): string;

    public function getAccessTokenFromLocal(): string;
}
