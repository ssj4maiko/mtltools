<?php

namespace App\Http\Middleware;

use Illuminate\Http\Middleware\TrustProxies as Middleware;
use Illuminate\Http\Request;

class TrustProxies extends Middleware
{
    /**
     * The trusted proxies for this application.
     *
     * @var array|string|null
     */
    protected $proxies;

    /**
     * Trusted proxies can also be set with TRUSTED_PROXIES (comma-separated IPs/CIDRs, or "*").
     * Used by the local production stack (the reverse proxy at PROXY_IP terminates TLS).
     * When unset, behaviour is unchanged ($proxies above).
     *
     * @return array|string|null
     */
    protected function proxies()
    {
        $env = env('TRUSTED_PROXIES');
        if (is_string($env) && trim($env) !== '') {
            $env = trim($env);
            return $env === '*' ? '*' : array_map('trim', explode(',', $env));
        }

        return $this->proxies;
    }

    /**
     * The headers that should be used to detect proxies.
     *
     * @var int
     */
    protected $headers =
        Request::HEADER_X_FORWARDED_FOR |
        Request::HEADER_X_FORWARDED_HOST |
        Request::HEADER_X_FORWARDED_PORT |
        Request::HEADER_X_FORWARDED_PROTO |
        Request::HEADER_X_FORWARDED_AWS_ELB;
}
