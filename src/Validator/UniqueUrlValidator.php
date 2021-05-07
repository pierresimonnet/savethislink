<?php

namespace App\Validator;

use App\Repository\WebsiteRepository;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class UniqueUrlValidator extends ConstraintValidator
{
    private WebsiteRepository $websiteRepository;
    private Security $security;

    public function __construct(WebsiteRepository $websiteRepository, Security $security)
    {
        $this->websiteRepository = $websiteRepository;
        $this->security = $security;
    }

    public function validate($value, Constraint $constraint)
    {
        /** @var \App\Validator\UniqueUrl $constraint */

        if (null === $value || '' === $value) {
            return;
        }

        /** @var \App\Entity\Website $value */
        $existingWebsite = $this->websiteRepository->findOneBy(['url' => $value->getUrl(), 'theme' => $value->getTheme()]);

        if(!$existingWebsite || $existingWebsite === $value){
            return;
        }   
        
        $this->context->buildViolation($constraint->message)
            ->setParameter('{{ value }}', $value->getUrl())
            ->addViolation();
    }
}
