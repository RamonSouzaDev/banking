<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = ['user_id', 'amount', 'description'];

    public $timestamps = false;

    protected $dates = ['created_at', 'updated_at'];

    protected $appends = ['formatted_created_at'];

    public function getFormattedCreatedAtAttribute()
    {
        return Carbon::parse($this->created_at)->format('d/m/Y h:i A');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
