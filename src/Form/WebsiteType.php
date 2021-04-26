<?php

namespace App\Form;

use App\Entity\Theme;
use App\Entity\Website;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\UrlType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Security\Core\Security;

class WebsiteType extends AbstractType
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('theme', EntityType::class, [
                'class' => Theme::class,
                'query_builder' => function(EntityRepository $er) {
                    return $er->createQueryBuilder('theme')->andWhere('theme.owner = :user')->setParameter('user', $this->security->getUser());
                },
                'choice_label' => 'title'
            ])
            ->add('url', UrlType::class)
            ->add('comment', TextareaType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Website::class,
        ]);
    }
}
