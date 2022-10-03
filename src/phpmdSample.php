<?php
// phpcs:ignore
namespace App;

class PhpmdSample
{
    public function bar($param)
    {
        if ($param === 42) {
            exit(23);
        }
    }
}