<?php

namespace App\Doctrine;

use App\Entity\Theme;
use Symfony\Component\String\Slugger\SluggerInterface;

class ThemeSetSlugListener
{
    private SluggerInterface $slugger;

    public function __construct(SluggerInterface $slugger)
    {   
        $this->slugger = $slugger;
    }

    public function prePersist(Theme $theme): void
    {
        if ($theme->getSlug()) {
            return;
        }
        
        if (null !== $theme->getTitle()) {
            $slug = $this->slugger->slug($theme->getTitle())->lower();
            $theme->setSlug($slug);
        }
    }
}