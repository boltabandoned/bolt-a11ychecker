<?php

namespace boltabandoned\allychecker;

use Bolt\Extension\SimpleExtension;
use Bolt\Asset\File\JavaScript;
use Bolt\Controller\Zone;
use Bolt\Asset\Target;

class allycheckerExtension extends SimpleExtension
{
    /**
     * {@inheritdoc}
     */
    protected function registerAssets()
    {
        $config = $this->getConfig();
        return [
            (new JavaScript('js/extension.js'))
                ->setZone(Zone::BACKEND)
                ->addAttribute('data-config="' . htmlentities(json_encode($config)) . '"')
                ->setLocation(Target::END_OF_BODY)
        ];
    }
}
