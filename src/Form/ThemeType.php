<?php

namespace App\Form;

use App\Entity\Theme;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ThemeType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('open', CheckboxType::class, [
                'label' => 'Open to contributions',
                'required' => false
            ])
            ->add('title', TextType::class, [
                'attr' => ['class' => 'input input-text', 'placeholder' => 'Choose a title for this theme'], 
                'label' => 'Title',
                'required' => true
            ])
            ->add('description', TextareaType::class, [
                'attr' => ['class' => 'input input-textarea', 'placeholder' => 'What is this theme about ?'], 
                'label' => 'Description',
                'required' => true
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Theme::class,
        ]);
    }
}
