<?php

namespace App\Validator;

use App\Repository\WebsiteRepository;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class UniqueUrlValidator extends ConstraintValidator
{
    private WebsiteRepository $websiteRepository;

    public function __construct(WebsiteRepository $websiteRepository)
    {
        $this->websiteRepository = $websiteRepository;
    }

    public function validate($value, Constraint $constraint)
    {
        /** @var \App\Validator\UniqueUrl $constraint */

        if (null === $value || '' === $value) {
            return;
        }

        /** @var \App\Entity\Website $value */
        if(!$this->websiteRepository->findOneBy(['url' => $value->getUrl(), 'theme' => $value->getTheme()])){
            return;
        }   
        
        $this->context->buildViolation($constraint->message)
            ->setParameter('{{ value }}', $value->getUrl())
            ->addViolation();
    }
}
