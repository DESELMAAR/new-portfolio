

<?php



return [
    'paths' => ['api/*'], // Paths to enable CORS for
    'allowed_methods' => ['*'], // Allowed HTTP methods
    'allowed_origins' => ['http://localhost:5173'], // Replace with your frontend URL
    'allowed_origins_patterns' => [], // Regex patterns for origins
    'allowed_headers' => ['*'], // Allowed headers
    'exposed_headers' => [], // Headers exposed to the client
    'max_age' => 0, // Max age for preflight requests
    'supports_credentials' => false, // Allow credentials (cookies, authorization headers)
];