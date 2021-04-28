<?php

namespace App\Validator;

use Symfony\Component\Security\Core\Security;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class ThemeOwnerValidator extends ConstraintValidator
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function validate($value, Constraint $constraint)
    {
        /** @var \App\Validator\ThemeOwner $constraint */

        if (null === $value || '' === $value) {
            return;
        }

        /** @var \App\Entity\Theme $value */
        if ($this->security->getUser() === $value->getOwner()) {
            return;
        }

        $this->context->buildViolation($constraint->message)
            ->addViolation();
    }
}
