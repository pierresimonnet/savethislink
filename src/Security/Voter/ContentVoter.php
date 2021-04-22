<?php

namespace App\Security\Voter;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class ContentVoter extends Voter
{
    protected function supports($attribute, $subject)
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, ['CONTENT_EDIT', 'CONTENT_DELETE'])
            && $subject instanceof \App\Entity\Website;
    }

    protected function voteOnAttribute($attribute, $subject, TokenInterface $token)
    {
        $user = $token->getUser();
        // if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }
        /** @var Website $subject */

        // ... (check conditions and return true to grant permission) ...
        switch ($attribute) {
            case 'CONTENT_EDIT':
                if ($subject->getAuthor() === $user) {
                    return true;
                }
            case 'CONTENT_DELETE':
                if ($subject->getAuthor() === $user) {
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
