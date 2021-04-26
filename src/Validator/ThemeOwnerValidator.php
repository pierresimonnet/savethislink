<?php

namespace App\Validator;

use App\Repository\ThemeRepository;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class ThemeOwnerValidator extends ConstraintValidator
{
    private $security;
    private $themeRepository;

    public function __construct(Security $security, ThemeRepository $themeRepository)
    {
        $this->security = $security;
        $this->themeRepository = $themeRepository;
    }

    public function validate($value, Constraint $constraint)
    {
        /** @var \App\Validator\ThemeOwner $constraint */

        if (null === $value || '' === $value) {
            return;
        }

        $isOwner = $this->themeRepository->findOneBy(['owner' => $this->security->getUser()]) === $value;

        if ($isOwner) {
            return;
        }

        $this->context->buildViolation($constraint->message)
            ->addViolation();
    }
}
