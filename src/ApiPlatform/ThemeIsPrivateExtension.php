<?php
namespace App\ApiPlatform;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use Doctrine\ORM\QueryBuilder;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Theme;
use Symfony\Component\Security\Core\Security;

class ThemeIsPrivateExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
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
        if ($resourceClass !== Theme::class) {
            return;
        }

        $rootAlias = $queryBuilder->getRootAliases()[0];
        
        if (!$this->security->getUser()) {
            $queryBuilder
                ->andWhere(sprintf('%s.private = :private', $rootAlias))
                ->setParameter('private', false);
        } else {
            $queryBuilder
                ->andWhere(sprintf('
                    %s.private = :private
                    OR %s.owner = :owner',
                    $rootAlias, $rootAlias
                ))
                ->setParameter('private', false)
                ->setParameter('owner', $this->security->getUser());
        }
    }
}
