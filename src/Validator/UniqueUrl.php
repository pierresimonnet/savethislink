<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 * @Target({"CLASS", "ANNOTATION"})
 */
class UniqueUrl extends Constraint
{
    /*
     * Any public properties become valid options for the annotation.
     * Then, use these in your validator class.
     */
    public $message = 'Le lien "{{ value }}" a déjà été ajouté à ce sujet.';

    public function getTargets()
    {
        return self::CLASS_CONSTRAINT;
    }
}
