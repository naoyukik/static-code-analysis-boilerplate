<?php // phpcs:ignoreFile
namespace App;

/**
 * @SuppressWarnings(PHPMD)
 */
class PsalmSample
{
    public function bar($param)
    {
        $unusedCode = [];
        if ($param === 42) {
            exit(23);
        }
        var_dump($param);
    }
}
