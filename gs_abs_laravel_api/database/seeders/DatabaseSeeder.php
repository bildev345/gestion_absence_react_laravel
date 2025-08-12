<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'nom' => 'kamali',
            'prenom' => 'ahmed',
            'email' => 'test@example.com',
            'password' => Hash::make('1234'),
            'role' => 'surveillant'
        ]);
    }
}
