<?php

namespace App\Doctrine;

use App\Entity\Theme;
use App\Repository\WebsiteRepository;

class ThemeSetWebsiteCountListener
{
    private WebsiteRepository $websiteRepository;

    public function __construct(WebsiteRepository $websiteRepository)
    {
        $this->websiteRepository = $websiteRepository;
    }

    public function postLoad(Theme $theme)
    {
        $theme->setWebsiteCount($this->websiteRepository->findCountWebsiteByTheme($theme));
    }
}