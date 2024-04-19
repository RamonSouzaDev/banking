use App\Models\Transaction;

$factory->define(Transaction::class, function (Faker\Generator $faker) {
    return [
        'user_id' => factory(App\Models\User::class),
        'amount' => $faker->numberBetween(100, 500),
        'description' => $faker->sentence,
    ];
});
