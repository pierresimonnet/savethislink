<?php

namespace App\Service;

use App\Entity\Follow;
use App\Entity\Theme;
use App\Repository\FollowRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;

class FollowInteractionService
{
    private FollowRepository $followRepository;
    private EntityManagerInterface $entityManager;
    private Security $security;

    public function __construct(FollowRepository $followRepository, EntityManagerInterface $entityManager, Security $security)
    {
        $this->followRepository = $followRepository;
        $this->entityManager = $entityManager;
        $this->security = $security;
    }

    public function follow(Theme $theme)
    {
        $user = $this->security->getUser();

        if($interaction = $this->isFollowing($theme)) {
            $this->entityManager->remove($interaction);
            $this->entityManager->flush();
        } else {
            $interaction = new Follow($user, $theme);
            $this->entityManager->persist($interaction);
            $this->entityManager->flush();
        }
    }

    public function isFollowing(Theme $theme)
    {
        $user = $this->security->getUser();

        return $this->followRepository->findOneBy(['followedBy' => $user, 'target' => $theme]);
    }
}