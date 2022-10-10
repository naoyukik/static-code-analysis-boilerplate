<?php
namespace App;

use App\PsalmSample;

class PhpAllSample
{
    private $_string = 'string';

    /**
     * @param integer $param
     */
    public function bar($param)
    {
        $oneLineArray = ['ham',$this->_string];
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
     * @param int $integer
     * @param string $str string
     * @param array $arr
     */
    function foo_Bar(int $integer, $str, $arr) {
    }

    private function _fooBar(): void {
    }
}

