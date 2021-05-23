<?php

namespace App\Security\Voter;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class ThemeVoter extends Voter
{
    protected function supports($attribute, $subject)
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, ['TOPIC_CREATE_CONTENT', 'TOPIC_READ', 'TOPIC_EDIT', 'TOPIC_DELETE'])
            && $subject instanceof \App\Entity\Theme;
    }

    protected function voteOnAttribute($attribute, $subject, TokenInterface $token)
    {
        $user = $token->getUser();

        /** @var \App\Entity\Theme $subject */
        switch ($attribute) {
            case 'TOPIC_CREATE_CONTENT':
                if ($subject->getOwner() === $user || $subject->getOpen()) {
                    return true;
                }
                break;
            case 'TOPIC_READ':
                if (!$subject->getPrivate() || ($subject->getPrivate() && $subject->getOwner() === $user)) {
                    return true;
                }
                break;
            case 'TOPIC_EDIT':
            case 'TOPIC_DELETE':
                if ($subject->getOwner() === $user) {
                    return true;
                }
                break;
        }

        return false;
    }
}
