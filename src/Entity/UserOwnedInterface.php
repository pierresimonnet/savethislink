<?php

namespace App\Entity;

interface UserOwnedInterface
{
    public function getOwner(): ?User;
    public function setOwner(?User $owner): self;
}