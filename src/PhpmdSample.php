<?php // phpcs:ignoreFile
namespace App;

class PhpmdSample
{
    public function bar($param)
    {
        $unusedCode = [];
        if ($param === 42) {
            exit(23);
        }
        var_dump();
    }
}
