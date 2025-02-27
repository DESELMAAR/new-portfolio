<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Create an admin user
        User::create([
            'name' => 'Abdessamad El maaroufi',
            'email' => 'elmaarpro@gmail.com',
            'password' => Hash::make('0700161503'), // Hash the password
        ]);

        // Create a regular user
        // User::create([
        //     'name' => 'Regular User',
        //     'email' => 'user@example.com',
        //     'password' => Hash::make('password'), // Hash the password
        // ]);

        // Create multiple users using a factory (optional)
        User::factory()->count(10)->create(); // Creates 10 random users
    }
}
