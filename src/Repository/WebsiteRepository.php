<?php

namespace App\Repository;

use App\Entity\Website;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Website|null find($id, $lockMode = null, $lockVersion = null)
 * @method Website|null findOneBy(array $criteria, array $orderBy = null)
 * @method Website[]    findAll()
 * @method Website[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WebsiteRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Website::class);
    }

    /**
     * @return Website[] Returns an array of Website objects
     */
    public function findWebsiteByTheme($theme)
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.theme = :theme')
            ->setParameter('theme', $theme)
            ->getQuery()
            ->getResult();
    }

    public function findCountWebsiteByTheme($theme): int
    {
        return $this->createQueryBuilder('w')
            ->select('count(w.id)')
            ->leftJoin('w.theme', 'websitetheme')
            ->andWhere('websitetheme = :theme')
            ->andWhere('websitetheme.approve = false OR websitetheme.approve = true AND w.approved = true')
            ->setParameter('theme', $theme)
            ->getQuery()
            ->getSingleScalarResult();
    }

    // /**
    //  * @return Website[] Returns an array of Website objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('w.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Website
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
