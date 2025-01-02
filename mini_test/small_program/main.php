<?php

declare(strict_types=1);

function isPrimeNumber(int $value): bool
{
    if ($value < 2) {
        return false;
    }
    if ($value === 2 || $value === 3) {
        return true;
    }
    if ($value % 2 === 0 || $value % 3 === 0) {
        return false;
    }

    $limit = sqrt($value);
    for ($i = 5; $i <= $limit; $i += 6) {
        if ($value % $i === 0 || $value % ($i + 2) === 0) {
            return false;
        }
    }

    return true;
}

$result = [];

for ($num = 1; $num <= 100; ++$num) {
    if (isPrimeNumber($num)) {
        continue;
    }

    $value = '';

    if ($num % 3 === 0) {
        $value .= 'Foo';
    }

    if ($num % 5 === 0) {
        $value .= 'Bar';
    }

    if ($value === '') {
        $value = (string) $num;
    }

    $result[] = $value;
}

$result = array_reverse($result);

echo implode(', ', $result)."\n";
