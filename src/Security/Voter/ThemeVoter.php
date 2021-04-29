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
        return in_array($attribute, ['THEME_CREATE_CONTENT', 'THEME_EDIT', 'THEME_DELETE'])
            && $subject instanceof \App\Entity\Theme;
    }

    protected function voteOnAttribute($attribute, $subject, TokenInterface $token)
    {
        $user = $token->getUser();
        // if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }

        /** @var \App\Entity\Theme $subject */
        switch ($attribute) {
            case 'THEME_CREATE_CONTENT':
            case 'THEME_EDIT':
                if ($subject->getOwner() === $user) {
                    return true;
                }
            case 'THEME_DELETE':
                if ($subject->getOwner() === $user) {
                    return true;
                }
                
                if ($this->security->isGranted('ROLE_ADMIN')) {
                    return true;
                }
                break;
        }

        return false;
    }
}
