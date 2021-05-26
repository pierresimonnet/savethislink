<?php

namespace App\Doctrine;

use App\Entity\Theme;
use App\Service\FollowInteractionService;

class ThemeSetFollowedByCurrentUserListener 
{
    private FollowInteractionService $followInteraction;

    public function __construct(FollowInteractionService $followInteraction)
    {
        $this->followInteraction = $followInteraction;    
    }

    public function postLoad(Theme $theme)
    {
        $interaction = $this->followInteraction->isFollowing($theme) ? true : false;

        $theme->setFollowedByCurrentUser($interaction);
    }
}