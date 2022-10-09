<?php
namespace App;

use App\PsalmSample;

class PhpAllSample
{
    /**
     * @param integer $param
     */
    public function bar($param)
    {
        $oneLineArray = ['ham','egg'];
        $list = [
            'ham',
            'egg',
            '01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456',
        ];
        $array = [
            'foo' => 0,
            'ba' => 1
        ];
        $unusedCode = [];
        $array[] = $undefined;
        if ($param == 42 && $array) {
            exit(23);
        }
        var_dump('string');

    }

    /**
     * @param int $integer number
     * @param string $str string
     * @param array $arr
     */
    function foo_Bar(int $integer, $str, $arr) {
    }

    public function fooBar(): void {
    }

}
