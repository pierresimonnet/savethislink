<?php
namespace App\ApiPlatform;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use Doctrine\ORM\QueryBuilder;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Website;
use Symfony\Component\Security\Core\Security;

class WebsiteIsApprovedExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    private Security $security;

    public function __construct(Security $security)
    {   
        $this->security = $security;
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, ?string $operationName = null)
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, ?string $operationName = null, array $context = [])
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass)
    {
        if ($resourceClass !== Website::class) {
            return;
        }

        if ($this->security->isGranted('ROLE_ADMIN')) {
            return;
        }
        
        $rootAlias = $queryBuilder->getRootAliases()[0];
        
        if (!$this->security->getUser()) {
            $queryBuilder
                ->leftJoin(sprintf('%s.theme', $rootAlias), 'theme')
                ->andWhere(sprintf('
                    %s.approved = :approved 
                    OR theme.approve = :needApprove', 
                    $rootAlias, $rootAlias
                ))
                ->setParameter('approved', true)
                ->setParameter('needApprove', false);
        } else {
            $queryBuilder
                ->leftJoin(sprintf('%s.theme', $rootAlias), 'theme')
                ->andWhere(sprintf('
                    %s.approved = :approved
                    OR %s.owner = :owner
                    OR theme.owner = :themeOwner
                    OR theme.approve = :needApprove',
                    $rootAlias, $rootAlias
                ))
                ->setParameter('approved', true)
                ->setParameter('owner', $this->security->getUser())
                ->setParameter('themeOwner', $this->security->getUser())
                ->setParameter('needApprove', false);
        }
    }
}
