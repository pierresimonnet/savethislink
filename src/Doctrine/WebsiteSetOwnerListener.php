<?php

namespace App\Doctrine;

use App\Entity\User;
use App\Entity\Website;
use Symfony\Component\Security\Core\Security;

class WebsiteSetOwnerListener
{
    private Security $security;

    public function __construct(Security $security)
    {   
        $this->security = $security;
    }

    public function prePersist(Website $content): void
    {
        if ($content->getOwner()) {
            return;
        }

        if ($this->security->getUser()) {
            /** @var User $user */
            $user = $this->security->getUser();

            $content->setOwner($user);
        }
    }
}