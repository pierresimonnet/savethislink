<?php

namespace App\Entity;

use App\Repository\FollowRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=FollowRepository::class)
 */
class Follow
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="following")
     * @ORM\JoinColumn(nullable=false)
     */
    private $followedBy;

    /**
     * @ORM\ManyToOne(targetEntity=Theme::class, inversedBy="followers")
     * @ORM\JoinColumn(nullable=false)
     */
    private $target;

    public function __construct(User $followedBy, Theme $target)
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->followedBy = $followedBy;
        $this->target = $target;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getFollowedBy(): ?User
    {
        return $this->followedBy;
    }

    public function setFollowedBy(?User $followedBy): self
    {
        $this->followedBy = $followedBy;

        return $this;
    }

    public function getTarget(): ?Theme
    {
        return $this->target;
    }

    public function setTarget(?Theme $target): self
    {
        $this->target = $target;

        return $this;
    }
}
