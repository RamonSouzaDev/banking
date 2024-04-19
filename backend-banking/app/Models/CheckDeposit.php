<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class CheckDeposit extends Model
{
    use HasFactory;
    
    protected $fillable = ['user_id', 'picture', 'amount', 'status', 'description'];

    protected $appends = ['formatted_created_at', 'picture_url'];

    public function getFormattedCreatedAtAttribute()
    {
        return Carbon::parse($this->created_at)->format('d/m/Y h:i A');
    }

    public function getPictureUrlAttribute()
    {
        if ($this->picture) {
            $formattedPath = str_replace('public/', '', $this->picture);
            return asset('storage/' . $formattedPath);
        }

        return null;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
