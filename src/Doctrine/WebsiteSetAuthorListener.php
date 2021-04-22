<?php

namespace App\Doctrine;

use App\Entity\User;
use App\Entity\Website;
use Symfony\Component\Security\Core\Security;

class WebsiteSetAuthorListener
{
    private Security $security;

    public function __construct(Security $security)
    {   
        $this->security = $security;
    }

    public function prePersist(Website $content): void
    {
        if ($content->getAuthor()) {
            return;
        }

        if ($this->security->getUser()) {
            /** @var User $user */
            $user = $this->security->getUser();

            $content->setAuthor($user);
        }
    }
}