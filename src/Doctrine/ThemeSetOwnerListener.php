<?php

namespace App\Doctrine;

use App\Entity\Theme;
use App\Entity\User;
use Symfony\Component\Security\Core\Security;

class ThemeSetOwnerListener
{
    private Security $security;

    public function __construct(Security $security)
    {   
        $this->security = $security;
    }

    public function prePersist(Theme $theme): void
    {
        if ($theme->getOwner()) {
            return;
        }

        if ($this->security->getUser()) {
            /** @var User $user */
            $user = $this->security->getUser();

            $theme->setOwner($user);
        }
    }
}