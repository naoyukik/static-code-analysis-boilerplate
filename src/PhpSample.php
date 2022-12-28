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
            '01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789',
        ];
        $array = [
            'foo' => 0,
            'ba' => 1
        ];
        $unusedCode = [];
        $array[] = $undefinedVariable;

        if ($param == 42) {
            exit(23);
        }

        if ($param == 421) {
            exit(23);
        }

        var_dump('string');
        return $array;
    }

    /**
     * @param int $integer
     * @param string $str string
     * @param array $arr
     */
    function foo_Bar(int $integer, $str, $arr) {
        $file = @fopen($filPath); // hides exceptions
        $key = @$array[$notExistingKey]; // assigns null to $key
        return new \stdClass();
    }


    private function _fooBar(): void {
    }
}
