<?php

namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;

class AppExtension extends AbstractExtension
{
    public function getFilters(): array
    {
        return [
            // If your filter generates SAFE HTML, you should add a third
            // parameter: ['is_safe' => ['html']]
            // Reference: https://twig.symfony.com/doc/2.x/advanced.html#automatic-escaping
            new TwigFilter('filter_name', [$this, 'doSomething']),
        ];
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('isActive', [$this, 'navIsActive'], ['is_safe' => ['html'], 'needs_context' => true]),
            new TwigFunction('icon', [$this, 'svgToIcon'], ['is_safe' => ['html']]),
        ];
    }

    public function navIsActive(array $context, string $menu)
    {
        if (($context['menu'] ?? null) === $menu) {
            return 'aria-current="page"';
        }
        
        return '';
    }

    public function svgToIcon(string $id, ?int $size = 24): string
    {
        $attributes = '';
        if ($size) {
            $attributes = "width=\"{$size}\" height=\"{$size}\"";
        }

        return <<<HTML
        <svg class="icon icon-{$id}" {$attributes} aria-hidden="true"><use xlink:href="/sprite.svg#{$id}"></use></svg>
        HTML;
    }
}
